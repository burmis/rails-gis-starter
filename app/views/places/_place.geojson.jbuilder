json.type "Feature"
json.geometry RGeo::GeoJSON.encode(place.lonlat)
json.properties do
  json.extract! place, :id, :name, :description, :lonlat, :x, :y, :created_at, :updated_at
end
json.url place_url(place, format: :geojson)
