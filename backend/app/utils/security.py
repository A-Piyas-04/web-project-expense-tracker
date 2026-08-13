from datetime import timedelta

# TODO: implement password hashing with passlib/bcrypt


def hash_password(password: str) -> str:
    # TODO: return hashed password
    pass


def verify_password(plain_password: str, hashed_password: str) -> bool:
    # TODO: verify plain password against hash
    pass


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    # TODO: encode and return a JWT access token
    pass


def decode_access_token(token: str) -> dict | None:
    # TODO: decode and validate JWT, return payload or None
    pass
