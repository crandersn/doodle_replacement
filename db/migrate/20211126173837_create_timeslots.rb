class CreateTimeslots < ActiveRecord::Migration
  def change
    create_table :timeslots do |t|
      t.boolean :available
      # t.string :name_of_scheduler
      t.string :date
      t.string :start_time
      t.integer :duration
      t.references :poll
    end
  end
end
