# rails-gis-starter
A simple starter app with Rails, mapbox, and PostGIS

## Prerequisites

1. A GitHub account
2. OPTIONAL: VS Code (to develop locally)

## Getting Started

1. Fork a copy of https://github.com/burmis/rails-gis-starter to your GitHub account

2. Open a new Codespace for this repo. These directions will assume you've done this.

3. Change into the project directory

```
cd rails-gis-starter/
```

4. Install the correct ruby with rvm

```
rvm install "ruby-3.1.3"
```

2. Install dependencies

```
bundle install
```

2. Set up the database by running

```
rails db:setup
```

3. Start up the dev server

```
rails server
```

4. Open the app has started you can access the homepage at http://localhost:3000

## FAQ

### How do I access the Rails console

The Rails console let's you run interactive commands and can be useful for debugging and understanding the app.

```
rails console
```

### How do I refresh my Codespace?

If you think you've really messed things up you can rebuild your Codespace.

1. Save, commit and push and changes you'd like to keep
2. Open the Command Pallette (CTRL/CMD + SHIFT + p)
3. Select the, "Codespaces: Rebuild Container" command

### How do I access the database directly?

You can see the details you need to connect in the /devcontainer/docker-compose.yml file, then access postgres like this:

```
psql -h db -U postgres postgres -W
```

When asked for the password use `postgres`.

# Resources

These are some of the tools used in this project

* [Rails 7](https://rubyonrails.org/)
* [Postgres](https://www.postgresql.org/)
* [PostGIS](https://registry.hub.docker.com/r/postgis/postgis) with [activerecord-postgis-adapter](https://github.com/rgeo/activerecord-postgis-adapter)
