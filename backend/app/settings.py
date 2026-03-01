# VARIABLES!
# any secret or env variables should be stored in a .env and initialized Settings; access from here

from pydantic_settings import BaseSettings, SettingsConfigDict # type safety when using env variables
from typing import List

import os # for accessing env variables directly 
DOTENV = os.path.join(os.path.dirname(__file__), '.env') # direct path to my .env file

# specify types and default values for env variables 
class Settings(BaseSettings):

    # database
    DATABASE_URL: str = 'url'

    model_config = SettingsConfigDict(env_file=DOTENV, extra='ignore') # specify .env file for env variables


settings = Settings() # files can access env from settings