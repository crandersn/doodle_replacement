class CreateTimeslots < ActiveRecord::Migration
  def change
    create_table :timeslots do |t|
      t.boolean :available
      # t.string :name_of_scheduler
      t.string :start_time
      t.string :end_time
      t.integer :num_votes
      t.string :notes
      t.references :poll
    end
  end
end
