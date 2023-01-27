class Place < ApplicationRecord
  delegate :x, to: :lonlat
  delegate :y, to: :lonlat
end
