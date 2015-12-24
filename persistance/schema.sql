create table if not exists users (
    user_id serial NOT NULL PRIMARY KEY,
    UNIQUE(user_id),
    facebook_id integer NOT NULL,
    hashed_token varchar(255),
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL
);

create table if not exists workouts (
    workout_id serial NOT NULL PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users ON DELETE cascade,
    date_completed date NOT NULL
);

create table if not exists exercises (
    exercise_id serial NOT NULL PRIMARY KEY,
    workout_id integer NOT NULL references workouts ON DELETE cascade,
    exercise_name varchar(255) NOT NULL,
    exercise_weight integer NOT NULL,
    completed_reps integer NOT NULL
);

create table if not exists friends (
    first_friend integer NOT NULL references users ON DELETE cascade,
    second_friend integer NOT NULL references users ON DELETE cascade
)