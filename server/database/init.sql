SELECT 'CREATE DATABASE dss'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'dss')\gexec
