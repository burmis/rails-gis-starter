class AddFieldnameToPlaces < ActiveRecord::Migration[7.0]
  def change
    add_column :places, :rate, :string
    Place.connection.execute("UPDATE places SET rate = floor(random() * 10 + 1)::int::text")
  end
end
