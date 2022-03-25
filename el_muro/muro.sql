create table users (
id serial primary key,
name varchar (255) not null,
email varchar (255) not null unique,
password varchar (255) not null,
created_at timestamp not null default now(),
updated_at timestamp not null default now()
);

create table messages (
id serial primary key,
user_id integer not null references users(id),
message varchar (255) not null,
created_at timestamp not null default now(),
updated_at timestamp not null default now()
);

create table comments (
id serial primary key,
message_id integer not null references messages(id),
user_id integer not null references users(id),
comment varchar (255) not null,
created_at timestamp not null default now(),
updated_at timestamp not null default now()
);
