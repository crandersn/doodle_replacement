class CreateReservers < ActiveRecord::Migration
  def change
    create_table :reservers do |t|
      t.string :name
      t.references :timeslot
    end
  end
end
