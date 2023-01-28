# rails-gis-starter
A simple starter app with Rails, mapbox, and PostGIS

## Homework
The repo exists for you to demonstrate some of your Ruby/React/PostGIS skills.

We don't expect you to know or understand these tools perfectly, so please take your time and do your best. We're as interested in seeing how productive you can be as you learn, and what you're able to accomplish, as we are in the final product.

If you have questions, email mark@statvis.com.

You don't need to make your repo private, but if you choose to please invite @markbennett as a collaborator with read permissions so we can review your work together.

We're aiming for you to spend no more than 2-hours on this so don't feel like you need to complete all these changes. As you progress, we'll try to make them harder so get as far as you can then let us know when you're done. Please don't spend more than 2-hours on this, and reach out if you're stuck.

Don't forget to look at the FAQ and RESOURCES in this README.

1. Follow the pre-requisites and get the app running in a Codespace
2. Increase the number of seeded items to 100 (HINT: Look in `seeds.rb`)
3. Change the title of the React component from "Our React App" to "Statvis" (HINT: Check out `App.jsx`)
4. Change the contents of the place popup (HINT: Checkout https://docs.mapbox.com/mapbox-gl-js/example/popup-on-click/)
5. Add a random shape to the map (HINT: Try this https://docs.mapbox.com/mapbox-gl-js/example/fill-pattern/)
6. Add filter to only display places with certain text in their names (HINT: You can do this in Ruby or JS, you pick)
7. Cluster places as you zoom out to ensure stable performance Increase the number of places to 1000, 10000, or more! How high can you go and still make it performant? (HINT: Checkout https://docs.mapbox.com/mapbox-gl-js/example/cluster/)
9. Add ratings to the Place model, populate them with data, then display the average rating for each place.
10. ADD YOUR OWN IDEA!

## Prerequisites

1. A GitHub account
2. OPTIONAL: VS Code (to develop locally)

## Getting Started

1. Fork a copy of https://github.com/burmis/rails-gis-starter to your GitHub account

2. Open a new Codespace for this repo. These directions will assume you've done this.

3. Install the correct ruby with rvm

```
rvm install "ruby-3.1.3"
rvm use "ruby-3.1.3"
```

4. Install dependencies

```
bundle install
yarn install
```

5. Set up the database by running

```
rails db:setup
```

6. Start up the dev server

```
bin/dev
```

7. Open the app has started you can access the homepage at http://localhost:3000

## Connecting to the Codespace a second time

I've not figured out why yet (PRs welcome!), but each time you connect to the codespace and open your first terminal you need to run:

```
rvm use "ruby-3.1.3"
```

If you don't do this you'll see errors about gem permissions and missing Ruby gems.

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

### Why am I seeing errors about missing gems and permission failures when I try to run `bundle install`?

You're probably not using the version of Ruby installed with RVM. This can happen if you restart a Codespace. To fix it switch to the version you installed using:

```
rvm use "ruby-3.1.3"
```

# Resources

These are some of the tools used in this project

* [Rails 7](https://rubyonrails.org/)
* [Postgres](https://www.postgresql.org/)
* [PostGIS](https://registry.hub.docker.com/r/postgis/postgis) with [activerecord-postgis-adapter](https://github.com/rgeo/activerecord-postgis-adapter)
* [Mapbox-GL Docs](https://docs.mapbox.com/mapbox-gl-js/guides/)
* [Mapbox-GL Examples](https://docs.mapbox.com/mapbox-gl-js/example/)
