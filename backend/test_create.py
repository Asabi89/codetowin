import requests

data = {
    "title": "Test Hackathon",
    "description": "Test",
    "type": "En ligne",
    "registration_mode": "open",
    "participant_limit": 100,
    "min_team_size": 1,
    "max_team_size": 4,
    "registration_start": "2026-06-21",
    "registration_end": "2026-06-30",
    "start_date": "2026-07-01",
    "end_date": "2026-07-10",
    "overview": "Test",
    "resources": "Test",
    "rules": "Test",
    "faqs": [{"question": "Q", "answer": "A"}],
    "interest": "Tech",
    "technologies": "React",
    "mentors": [],
    "logo": None,
    "banner": None,
    "status": "publie",
    "deadline": "2026-07-10"
}

# we need an auth token or just bypass it since we are local
# wait, the endpoint requires authentication.
# let me create an organizer user and get a token.
