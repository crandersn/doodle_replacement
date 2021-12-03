class CreateInvitees < ActiveRecord::Migration
  def change
    create_table :invitees do |t|
      t.string :name
      t.string :phone_number
      t.references :poll
    end
  end
end
