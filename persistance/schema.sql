create table if not exists users (
    user_id serial NOT NULL PRIMARY KEY,
    UNIQUE(user_id),
    fb_id integer NOT NULL,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL
);

create table if not exists hashed_tokens (
    user_id integer NOT NULL REFERENCES users ON UPDATE cascade ON DELETE cascade,
    hashed_fb_token varchar(255)
);

create table if not exists workouts (
    workout_id serial NOT NULL PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users ON UPDATE cascade ON DELETE cascade,
    date_completed date NOT NULL
);

create table if not exists exercises (
    exercise_id serial NOT NULL PRIMARY KEY,
    workout_id integer NOT NULL references workouts ON UPDATE cascade ON DELETE cascade,
    exercise_name varchar(255) NOT NULL,
    exercise_weight integer NOT NULL,
    completed_reps integer NOT NULL
);

create table if not exists friends (
    friends_id serial PRIMARY KEY,
    first_friend integer NOT NULL references users ON UPDATE cascade ON DELETE cascade,
    second_friend integer NOT NULL references users ON UPDATE cascade ON DELETE cascade
)