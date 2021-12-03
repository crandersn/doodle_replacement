# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
# Poll 2 ----------------------------------------------------

poll1 = {
  :poll_name => "Lab 3 Checkoff",
  :time_zone => 'CST',
  :poll_description => "Signup for Lab 3 Checkoff. Website should be functional.",
  :meeting_location => "1212 SC",
  :votes_per_timeslot => "2",
  :votes_per_person => "2",
  :status => "Not Started",
  :deadline => "2021-12-30",
  :admin_id => 1
}
Poll.create!(poll1)

invitee1 = {
  :name => 'Luke Hageman',
  :phone_number => "+15635439088",
  :poll_id => 1
}
Invitee.create!(invitee1)

Invitee.create!(invitee2)

timeslot1 = {
  :available => true,
  :start_time => "Tue, 30 Nov 2021 12:00:00 GMT",
  :end_time => "Tue, 30 Nov 2021 13:00:00 GMT",
  :num_votes => 0,
  :notes => "With Nick",
  :poll_id => 1
}
Timeslot.create!(timeslot1)

timeslot2 = {
  :available => true,
  :start_time => "Tue, 30 Nov 2021 11:00:00 GMT",
  :end_time => "Tue, 30 Nov 2021 11:30:00 GMT",
  :num_votes => 0,
  :notes => "With Tessa",
  :poll_id => 1
}
Timeslot.create!(timeslot2)

reserver1 = {
  :name => "John Doe",
  :timeslot_id => 1
}
Reserver.create!(reserver1)

reserver2 = {
  :name => "John Dod",
  :timeslot_id => 1
}
Reserver.create!(reserver2)

reserver3 = {
  :name => "Bob Dole",
  :timeslot_id => 2
}
Reserver.create!(reserver3)

reserver4 = {
  :name => "Bob Anderson",
  :timeslot_id => 2
}
Reserver.create!(reserver4)