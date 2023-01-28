json.type "FeatureCollection"
json.features do
  json.array! @places, partial: "places/place", as: :place
end
