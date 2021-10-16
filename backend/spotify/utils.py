from django.utils import timezone
from .models import SpotifyToken
from datetime import timedelta

# Gets user tokens from database
def get_user_tokens(username):
    user_tokens = SpotifyToken.objects.filter(user=username) 
    if user_tokens.exists():
        return user_tokens[0]
    else:
        return None


# Save user tokens
def update_or_create_user_tokens(username, access_token, refresh_token, token_type, expires_in):

    tokens = get_user_tokens(username)
    expires_in = timezone.now() + timedelta(seconds=3600) # token expires in 3600 seconds (1 hr)

    # if tokens exists then update token
    if tokens:
        tokens.access_token = access_token
        tokens.refresh_token = refresh_token
        tokens.token_type = token_type
        tokens.expires_in = expires_in
        tokens.save(update_fields=['access_token', 'refresh_token', 'expires_in', 'token_type'])

    # otherwise create new token
    else:
        tokens = SpotifyToken(
            user=username,
            access_token=access_token,
            refresh_token=refresh_token,
            token_type=token_type,
            expires_in=expires_in
        )
        tokens.save()