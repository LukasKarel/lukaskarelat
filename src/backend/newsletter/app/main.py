from enum import Enum
import re
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta, timezone
import hmac
import time
import hashlib
from urllib.parse import urlparse

import listmonk
from pydantic import (
    AnyHttpUrl,
    BaseModel,
    EmailStr,
    Field,
    field_validator,
    SecretStr,
)

from pydantic_settings import (
    BaseSettings,
)

from app.core.configuration import make_settings, prefix_config


class TokenSettings(BaseSettings):
    secret: SecretStr = Field(default="AABBCCDD", min_length=8, validate_default=True, description="The secret key using to sign tokens")
    lifetime: timedelta = Field(default="00:10:00")

class CorsSettings(BaseSettings):
    allowed_origins: list[str] = ["http://localhost:5173"]

    @field_validator("allowed_origins", mode="after")
    def validate_and_normalize(cls, origins: list[str]) -> list[str]:
        validated = []
        for origin in origins:
            parsed = urlparse(origin)
            if parsed.scheme not in {"http", "https"} or not parsed.netloc:
                raise ValueError(f"Invalid origin URL: {origin}")
            if len(parsed.path) > 0:
                raise ValueError(f"Invalid url: {origin}")
            validated.append(origin.rstrip("/"))
        return validated

token_settings = make_settings(TokenSettings, prefix_config("APP", "TOKEN"))
cors_settings = make_settings(CorsSettings, prefix_config("APP", "CORS"))
cors_allowed_origins = [str(url) for url in cors_settings.allowed_origins]

api = FastAPI()

api.add_middleware(
    CORSMiddleware,
    allow_origins=cors_allowed_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


class FormTokenDto(BaseModel):
    formToken: str

@api.get("/api/newsletter/formToken")
def formToken() -> FormTokenDto:

    now_utc = datetime.now(timezone.utc)
    now = now_utc.timestamp()
    ts = str(int(now))
    sig = hmac.new(token_settings.secret.get_secret_value().encode("ascii"), ts.encode(), hashlib.sha256).hexdigest()
    token = f"{ts}:{sig}"
    return FormTokenDto(formToken=token)


def verify_token(token: str) -> bool:
    try:
        ts_str, sig = token.split(":")
        ts = int(ts_str)
        token_timestamp = datetime.fromtimestamp(ts, timezone.utc)
    except Exception:
        return False
    expected = hmac.new(token_settings.secret.get_secret_value().encode("ascii"), ts_str.encode(), hashlib.sha256).hexdigest()
    if not hmac.compare_digest(sig, expected):
        return False
    if datetime.now(timezone.utc) - token_timestamp > token_settings.lifetime:
        return False
    return True

class SubscribeRequestDto(BaseModel):
    formToken: str
    email: EmailStr
    honeypot: str

class SubscribeResponseDto(BaseModel):
    email: str

class ListMonkSettings(BaseSettings):
    baseurl: str = Field(description="The url to the listmonk api")
    password: SecretStr = Field(description="The secret for the listmonk api client")
    username: str = Field(description="The username for the listmonk api client")

listmonk_settings = make_settings(ListMonkSettings, prefix_config("APP", "LISTMONK"))

listmonk.set_url_base(listmonk_settings.baseurl)
listmonk.login(listmonk_settings.username, listmonk_settings.password.get_secret_value())
valid: bool = listmonk.verify_login()
if not valid:
    raise Exception("listmonk not accessible")


@api.post("/api/newsletter/subscribe")
async def subscribe(
    dto: SubscribeRequestDto
) -> SubscribeResponseDto:
    # Honeypot check
    if dto.honeypot.strip() != "":
        # bot was detected
        raise HTTPException(status_code=400)

    # Verify HMAC token
    if not verify_token(dto.formToken):
        # bot might be detected
        raise HTTPException(status_code=400)
    
    sub = listmonk.subscriber_by_email(email=dto.email)
    if sub is not None:
        # if user was already added to list, everythings fine.
        # do NOT check if user is blocklisted and change response according to user status
        # because than everybody could check random addresses and check if they are registered (data leak)
        return SubscribeResponseDto(email=dto.email)

    lists = listmonk.lists()
    # filter for public lists
    lists = [item for item in lists if item.type == "public"]
    list_ids = [list.id for list in lists]
    name = dto.email.split("@")[0]
    sub = listmonk.create_subscriber(email=dto.email, name=name, list_ids=list_ids, pre_confirm=False, attribs={})

    return SubscribeResponseDto(email=dto.email)


@api.post("/api/newsletter/optin")
async def subscribe(
    dto: SubscribeRequestDto
) -> SubscribeResponseDto:
    # Honeypot check
    if dto.honeypot.strip() != "":
        # bot was detected
        raise HTTPException(status_code=400)

    # Verify HMAC token
    if not verify_token(dto.formToken):
        # bot might be detected
        raise HTTPException(status_code=400)
    
    sub = listmonk.subscriber_by_email(email=dto.email)
    if sub is not None:
        # if user was already added to list, everythings fine.
        # do NOT check if user is blocklisted and change response according to user status
        # because than everybody could check random addresses and check if they are registered (data leak)
        return SubscribeResponseDto(email=dto.email)

    lists = listmonk.lists()
    # filter for public lists
    lists = [item for item in lists if item.type == "public"]
    list_ids = [list.id for list in lists]
    name = dto.email.split("@")[0]
    sub = listmonk.create_subscriber(email=dto.email, name=name, list_ids=list_ids, pre_confirm=False, attribs={})

    return SubscribeResponseDto(email=dto.email)