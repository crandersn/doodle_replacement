class CreatePolls < ActiveRecord::Migration
  def up
    create_table :polls do |t|
      t.string :poll_name
      t.string :time_zone
      t.string :poll_description
      t.string :meeting_location
      t.string  :votes_per_timeslot
      t.string  :votes_per_person
      t.string :deadline
      t.string :status
      t.references :admin
    end
  end

  def down
    drop_table :polls
  end
end
