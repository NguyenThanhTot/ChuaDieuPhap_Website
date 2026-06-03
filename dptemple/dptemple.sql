CREATE DATABASE IF NOT EXISTS buddhist_website
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE buddhist_website;

create table users
(
    id            char(36)                              default (uuid())          not null
        primary key,
    avatar_url    varchar(500)                                                    null,
    full_name     varchar(200)                                                    not null,
    dharma_name   varchar(200)                                                    null,
    phone         varchar(20)                                                     null,
    date_of_birth date                                                            null,
    email         varchar(255)                                                    not null,
    password_hash varchar(255)                                                    not null,
    gender        enum ('male', 'female', 'other')                                null,
    occupation    varchar(200)                                                    null,
    address       text                                                            null,
    role          enum ('admin', 'user') default 'user'          not null,
    is_active     tinyint(1)                            default 1                 not null,
    is_email_verified tinyint(1)                        default 0                 not null,
    email_verification_token varchar(255)                                           null,
    email_verification_token_expiry datetime                                        null,
    created_by    char(36)                                                        null,
    created_at    datetime                              default CURRENT_TIMESTAMP not null,
    updated_by    char(36)                                                        null,
    updated_at    datetime                              default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    deleted_by    char(36)                                                        null,
    deleted_at    datetime                                                        null,
    constraint uq_users_email
        unique (email),
    constraint fk_users_created_by
        foreign key (created_by) references users (id)
            on delete set null,
    constraint fk_users_deleted_by
        foreign key (deleted_by) references users (id)
            on delete set null,
    constraint fk_users_updated_by
        foreign key (updated_by) references users (id)
            on delete set null
);

create table about
(
    id                 char(36) default (uuid())          not null
        primary key,
    years_established  int                                null,
    total_buddhists    int                                null,
    annual_events      int                                null,
    charity_activities int                                null,
    introduction_text  text                               null,
    created_by         char(36)                           null,
    created_at         datetime default CURRENT_TIMESTAMP not null,
    updated_by         char(36)                           null,
    updated_at         datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    deleted_at         timestamp                          null,
    deleted_by         char(36)                           null,
    constraint about_ibfk_1
        foreign key (deleted_by) references users (id)
            on delete set null,
    constraint fk_about_created_by
        foreign key (created_by) references users (id)
            on delete set null,
    constraint fk_about_updated_by
        foreign key (updated_by) references users (id)
            on delete set null
);

create index deleted_by
    on about (deleted_by);

create table contact_info
(
    id         char(36)   default (uuid())          not null
        primary key,
    label      varchar(200)                         not null comment 'Chua chinh / Van phong...',
    address    text                                 not null,
    phone      varchar(20)                          null,
    email      varchar(255)                         null,
    open_time  time                                 null,
    close_time time                                 null,
    is_active  tinyint(1) default 1                 not null,
    created_by char(36)                             null,
    created_at datetime   default CURRENT_TIMESTAMP not null,
    updated_by char(36)                             null,
    updated_at datetime   default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    deleted_at timestamp                            null,
    deleted_by char(36)                             null,
    constraint contact_info_ibfk_1
        foreign key (deleted_by) references users (id)
            on delete set null,
    constraint fk_contact_created_by
        foreign key (created_by) references users (id)
            on delete set null,
    constraint fk_contact_updated_by
        foreign key (updated_by) references users (id)
            on delete set null
);

create index deleted_by
    on contact_info (deleted_by);

create table dharma_talks
(
    id                char(36)   default (uuid())          not null
        primary key,
    title             varchar(500)                         not null,
    youtube_url       varchar(500)                         not null,
    thumbnail_url     varchar(500)                         null,
    description       text                                 null,
    is_published      tinyint(1) default 0                 not null,
    homepage_priority int        default 0                 not null comment '0=hidden, 1-100=show on homepage (asc)',
    created_by        char(36)                             null,
    created_at        datetime   default CURRENT_TIMESTAMP not null,
    updated_by        char(36)                             null,
    updated_at        datetime   default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    deleted_by        char(36)                             null,
    deleted_at        datetime                             null,
    constraint fk_dharma_created_by
        foreign key (created_by) references users (id)
            on delete set null,
    constraint fk_dharma_deleted_by
        foreign key (deleted_by) references users (id)
            on delete set null,
    constraint fk_dharma_updated_by
        foreign key (updated_by) references users (id)
            on delete set null
);

create index idx_dharma_homepage
    on dharma_talks (homepage_priority, is_published, deleted_at);

create table events
(
    id                char(36)   default (uuid())          not null
        primary key,
    title             varchar(500)                         not null,
    image_url         varchar(500)                         null,
    start_date        date                                 not null,
    end_date          date                                 null,
    event_time        time                                 null,
    location          varchar(500)                         null,
    description       text                                 null,
    is_featured       tinyint(1) default 0                 not null comment '1 = highlight on homepage',
    is_published      tinyint(1) default 0                 not null,
    homepage_priority int        default 0                 not null comment '0=hidden, 1-100=show on homepage (asc)',
    created_by        char(36)                             null,
    created_at        datetime   default CURRENT_TIMESTAMP not null,
    updated_by        char(36)                             null,
    updated_at        datetime   default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    deleted_by        char(36)                             null,
    deleted_at        datetime                             null,
    constraint fk_events_created_by
        foreign key (created_by) references users (id)
            on delete set null,
    constraint fk_events_deleted_by
        foreign key (deleted_by) references users (id)
            on delete set null,
    constraint fk_events_updated_by
        foreign key (updated_by) references users (id)
            on delete set null,
    constraint chk_event_dates
        check ((`end_date` is null) or (`end_date` >= `start_date`))
);

create index idx_events_featured
    on events (is_featured, deleted_at);

create index idx_events_homepage
    on events (homepage_priority, is_published, deleted_at);

create index idx_events_start
    on events (start_date);

create table history_milestones
(
    id            char(36) default (uuid())          not null
        primary key,
    about_id      char(36)                           not null,
    title         varchar(500)                       not null,
    year          int                                not null,
    description   text                               null,
    display_order int      default 0                 not null,
    created_by    char(36)                           null,
    created_at    datetime default CURRENT_TIMESTAMP not null,
    updated_by    char(36)                           null,
    updated_at    datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    deleted_at    timestamp                          null,
    deleted_by    char(36)                           null,
    constraint fk_milestone_about
        foreign key (about_id) references about (id)
            on delete cascade,
    constraint fk_milestone_created_by
        foreign key (created_by) references users (id)
            on delete set null,
    constraint fk_milestone_updated_by
        foreign key (updated_by) references users (id)
            on delete set null,
    constraint history_milestones_ibfk_1
        foreign key (deleted_by) references users (id)
            on delete set null
);

create index deleted_by
    on history_milestones (deleted_by);

create index idx_milestone_order
    on history_milestones (display_order);

create index idx_milestone_year
    on history_milestones (year);

create table home_config
(
    id                char(36) default (uuid())          not null
        primary key,
    hero_image_url    varchar(500)                       null,
    hero_title        varchar(500)                       null,
    hero_description  text                               null,
    introduction_text text                               null,
    created_by        char(36)                           null,
    created_at        datetime default CURRENT_TIMESTAMP not null,
    updated_by        char(36)                           null,
    updated_at        datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    deleted_at        timestamp                          null,
    deleted_by        char(36)                           null,
    constraint fk_homeconf_created_by
        foreign key (created_by) references users (id)
            on delete set null,
    constraint fk_homeconf_updated_by
        foreign key (updated_by) references users (id)
            on delete set null,
    constraint home_config_ibfk_1
        foreign key (deleted_by) references users (id)
            on delete set null
);

create index deleted_by
    on home_config (deleted_by);

create table messages
(
    id           char(36)                          default (uuid())          not null
        primary key,
    sender_name  varchar(200)                                                not null,
    sender_email varchar(255)                                                null,
    sender_phone varchar(20)                                                 null,
    content      text                                                        not null,
    channel      enum ('web', 'email', 'facebook') default 'web'             not null,
    is_read      tinyint(1)                        default 0                 not null,
    created_by   char(36)                                                    null comment 'NULL if guest',
    created_at   datetime                          default CURRENT_TIMESTAMP not null,
    updated_by   char(36)                                                    null,
    updated_at   datetime                          default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    deleted_at   timestamp                                                   null,
    deleted_by   char(36)                                                    null,
    constraint fk_messages_created_by
        foreign key (created_by) references users (id)
            on delete set null,
    constraint fk_messages_updated_by
        foreign key (updated_by) references users (id)
            on delete set null,
    constraint messages_ibfk_1
        foreign key (deleted_by) references users (id)
            on delete set null
);

create index deleted_by
    on messages (deleted_by);

create index idx_messages_unread
    on messages (is_read, created_at);

create table news
(
    id                char(36)   default (uuid())          not null
        primary key,
    title             varchar(500)                         not null,
    published_date    date       default (curdate())       not null,
    author_id         char(36)                             null,
    thumbnail_url     varchar(500)                         null,
    content           longtext                             not null comment 'Markdown or HTML',
    is_featured       tinyint(1) default 0                 not null comment '1 = highlight on homepage',
    is_published      tinyint(1) default 0                 not null,
    homepage_priority int        default 0                 not null comment '0=hidden, 1-100=show on homepage (asc)',
    created_by        char(36)                             null,
    created_at        datetime   default CURRENT_TIMESTAMP not null,
    updated_by        char(36)                             null,
    updated_at        datetime   default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    deleted_by        char(36)                             null,
    deleted_at        datetime                             null,
    constraint fk_news_author
        foreign key (author_id) references users (id)
            on delete set null,
    constraint fk_news_created_by
        foreign key (created_by) references users (id)
            on delete set null,
    constraint fk_news_deleted_by
        foreign key (deleted_by) references users (id)
            on delete set null,
    constraint fk_news_updated_by
        foreign key (updated_by) references users (id)
            on delete set null
);

create index idx_news_author
    on news (author_id);

create index idx_news_date
    on news (published_date desc);

create index idx_news_featured
    on news (is_featured, deleted_at);

create index idx_news_homepage
    on news (homepage_priority, is_published, deleted_at);

create table notifications
(
    id                char(36)   default (uuid())          not null
        primary key,
    title             varchar(500)                         not null,
    content           longtext                             not null comment 'Markdown or HTML',
    is_published      tinyint(1) default 0                 not null,
    is_featured       tinyint(1) default 0                 not null comment '1 = highlight on homepage',
    homepage_priority int        default 0                 not null comment '0=hidden, 1-100=show on homepage (asc)',
    created_by        char(36)                             null,
    created_at        datetime   default CURRENT_TIMESTAMP not null,
    updated_by        char(36)                             null,
    updated_at        datetime   default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    deleted_by        char(36)                             null,
    deleted_at        datetime                             null,
    constraint fk_notif_created_by
        foreign key (created_by) references users (id)
            on delete set null,
    constraint fk_notif_deleted_by
        foreign key (deleted_by) references users (id)
            on delete set null,
    constraint fk_notif_updated_by
        foreign key (updated_by) references users (id)
            on delete set null
);

create index idx_notifications_featured
    on notifications (is_featured, deleted_at);

create index idx_notifications_homepage
    on notifications (homepage_priority, is_published, deleted_at);

create table social_links
(
    id         char(36)   default (uuid())          not null
        primary key,
    platform   varchar(100)                         not null comment 'youtube / facebook / instagram',
    url        varchar(500)                         not null,
    icon       varchar(200)                         null,
    is_active  tinyint(1) default 1                 not null,
    created_by char(36)                             null,
    created_at datetime   default CURRENT_TIMESTAMP not null,
    updated_by char(36)                             null,
    updated_at datetime   default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    deleted_at timestamp                            null,
    deleted_by char(36)                             null,
    constraint fk_social_created_by
        foreign key (created_by) references users (id)
            on delete set null,
    constraint fk_social_updated_by
        foreign key (updated_by) references users (id)
            on delete set null,
    constraint social_links_ibfk_1
        foreign key (deleted_by) references users (id)
            on delete set null
);

create index deleted_by
    on social_links (deleted_by);