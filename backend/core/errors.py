class DomainError(Exception):
    status_code = 400
    code = "BAD_REQUEST"
    message = "Request could not be completed"


class EmailAlreadyRegistered(DomainError):
    status_code = 409
    code = "EMAIL_TAKEN"
    message = "That email is already registered"


class UsernameTaken(DomainError):
    status_code = 409
    code = "USERNAME_TAKEN"
    message = "That username is taken"


class InvalidCredentials(DomainError):
    status_code = 401
    code = "INVALID_CREDENTIALS"
    message = "Incorrect email or password"
