# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


poll1 = {
  :poll_name => "Lab 3 Checkoff",
  :poll_identifier => "Kg7jH8L78",
  :poll_description => "Signup for Lab 3 Checkoff. Website should be functional.",
  :meeting_location => "1212 SC",
  :status => "active",
  :deadline => "11:59:59,12-10-2021",
  :admin_id => 1
}
Poll.create!(poll1)


invitee1 = {
  :phone_number => "111-867-5309",
  :poll_id => 1
}
Invitee.create!(invitee1)


invitee2 = {
  :phone_number => "999-999-9999",
  :poll_id => 1
}
Invitee.create!(invitee2)


timeslot1 = {
  :available => true,
  :date => "12-9-2021",
  :start_time => "8:15",
  :duration => "15",
  :poll_id => 1
}
Timeslot.create!(timeslot1)

timeslot2 = {
  :available => false,
  :date => "12-9-2021",
  :start_time => "8:30",
  :duration => "15",
  :poll_id => 1
}
Timeslot.create!(timeslot2)

timeslot3 = {
  :available => true,
  :date => "12-9-2021",
  :start_time => "8:45",
  :duration => "15",
  :poll_id => 1
}
Timeslot.create!(timeslot3)

reserver1 = {
  :name => "John Doe",
  :timeslot_id => 2
}
Reserver.create!(reserver1)