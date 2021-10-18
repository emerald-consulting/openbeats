from django.utils import timezone
from .models import SpotifyToken
from datetime import timedelta

# Gets user tokens from database
def get_user_tokens(session_id):
    user_tokens = SpotifyToken.objects.filter(session_id=session_id) 
    if user_tokens.exists():
        return user_tokens[0]
    else:
        return None


# Save user tokens
def update_or_create_user_tokens(session_id, access_token, refresh_token, token_type, expires_in):

    tokens = get_user_tokens(session_id)
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
            session_id=session_id,
            access_token=access_token,
            refresh_token=refresh_token,
            token_type=token_type,
            expires_in=expires_in
        )
        tokens.save()

