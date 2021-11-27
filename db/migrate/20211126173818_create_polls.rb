class CreatePolls < ActiveRecord::Migration
  def up
    create_table :polls do |t|
      t.string :poll_name
      t.string :poll_description
      t.string :meeting_location
      t.string :deadline
      t.string :status
      t.references :admin
    end
  end

  def down
    drop_table :polls
  end
end
