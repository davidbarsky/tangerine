create table if not exists users (
    user_id serial NOT NULL PRIMARY KEY,
    UNIQUE(user_id),
    fb_id integer NOT NULL,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL
);

create table if not exists hashed_tokens (
    user_id integer NOT NULL references users
    hashed_fb_token varchar(255)
);

create table if not exists workouts (
    workout_id serial NOT NULL PRIMARY KEY,
    user_id integer NOT NULL references users
);

create table if not exists exercises (
    exercise_id serial NOT NULL PRIMARY KEY,
    user_id integer NOT NULL references users
);

create table if not exists friends (
    friends_id serial PRIMARY KEY,
    first_friend integer NOT NULL references users
    second_friend integer NOT NULL references users
)