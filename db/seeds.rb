# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ na∏me: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

EDMONTON_LONGITUDE = -113.6571...-113.3513
EDMONTON_LATTITUDE = 53.4198...53.6467

NUMBER_OF_RANDOM_PLACES = 1000

def create_point_in_edmonton
  prng = Random.new
  lon = prng.rand(EDMONTON_LONGITUDE)
  lat = prng.rand(EDMONTON_LATTITUDE)

  "POINT(#{lon} #{lat})"
end

# Create some places
Place.create(name: "Kind Ice Cream", description: "They've got icecream made from honeycomb", lonlat: "POINT(-113.43810140286973 53.564635699516764)")
Place.create(name: "Made By Marcus - Brewery District", description: "Local ice cream and unique flavour", lonlat: "POINT(-113.53042023431169 53.54707919418513)")
Place.create(name: "Kind Ice Cream 2", description: "There's more than one!", lonlat: "POINT(-113.47609371717311 53.512132217895946)")
Place.create(name: "Drizzle", description: "Come get some sizzle!", lonlat: "POINT(-113.49606085274831 53.5172355159749)")
Place.create(name: "Made By Marcus - Whyte Ave", description: "The original in Edmonton", lonlat: "POINT(-113.49869858832798 53.51823251608002)")

# Create some random places
NUMBER_OF_RANDOM_PLACES.times do |i|
  Place.create(name: "Random Place #{i}", description: "description of place #{i}", lonlat: create_point_in_edmonton)
end
