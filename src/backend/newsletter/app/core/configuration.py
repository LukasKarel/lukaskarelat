from pydantic_settings import (
    BaseSettings,
    SettingsConfigDict
)

from typing import Type, TypeVar

import logging

T = TypeVar("T", bound=BaseSettings)

def make_settings(settings_cls: Type[T], prefix: str) -> T:
    class ConfiguredSettings(settings_cls):
        model_config = SettingsConfigDict(env_prefix=prefix + "_", case_sensitive=False)

    
    settings = ConfiguredSettings()

    logging.getLogger(__name__).debug("Loaded settings {SettingsName} with {SettingsValue}", extra={
        "SettingsName":settings_cls.__name__,
        "SettingsValue": settings.model_dump_json(),
    })

    return settings


def prefix_config(base: str, suffix: str) -> str:
    if not base:
        return suffix
    if base.endswith("_"):
        return base + suffix
    return base + "_" + suffix