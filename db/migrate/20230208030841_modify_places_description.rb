class ModifyPlacesDescription < ActiveRecord::Migration[7.0]
  def change
    Place.connection.execute("UPDATE places SET description = description || ' (changed)'")
  end
end
