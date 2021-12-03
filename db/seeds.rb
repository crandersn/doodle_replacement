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
  # :poll_identifier => "3",
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
  :name => 'Bob',
  :phone_number => "(1)111-867-5309",
  :poll_id => 1
}
Invitee.create!(invitee1)

invitee2 = {
  :name => 'Alice',
  :phone_number => "(1)999-999-9999",
  :poll_id => 1
}
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
  :available => false,
  :start_time => "Tue, 30 Nov 2021 11:00:00 GMT",
  :end_time => "Tue, 30 Nov 2021 11:30:00 GMT",
  :num_votes => 1,
  :notes => "With Tessa",
  :poll_id => 1
}
Timeslot.create!(timeslot2)

reserver1 = {
  :name => "John Doe",
  :timeslot_id => 2
}
Reserver.create!(reserver1)

# Poll 2 ----------------------------------------------------

poll2 = {
  :poll_name => "Lab 2 Checkoff",
  :time_zone => 'CST',
  # :poll_identifier => "2",
  :poll_description => "Signup for Lab 2 Checkoff. Sensor should be working.",
  :meeting_location => "1212 SC",
  :votes_per_timeslot => "1",
  :votes_per_person => "1",
  :status => "Active",
  :deadline => "2021-10-30",
  :admin_id => 1
}
Poll.create!(poll2)

timeslot2_1 = {
  :available => true,
  :start_time => "Tue, 30 Nov 2021 12:00:00 GMT",
  :end_time => "Tue, 30 Nov 2021 13:00:00 GMT",
  :num_votes => 0,
  :notes => "With Nick",
  :poll_id => 1
}
Timeslot.create!(timeslot2_1)

timeslot2_2 = {
  :available => true,
  :start_time => "Tue, 30 Nov 2021 11:00:00 GMT",
  :end_time => "Tue, 30 Nov 2021 11:30:00 GMT",
  :num_votes => 1,
  :notes => "With Tessa",
  :poll_id => 1
}
Timeslot.create!(timeslot2_2)



# Poll 3 ----------------------------------------------------

poll3 = {
  :poll_name => "Lab 1 Checkoff",
  :time_zone => 'CST',
  # :poll_identifier => "1",
  :poll_description => "Signup for Lab 1 Checkoff. Temp sensor and site check.",
  :meeting_location => "1212 SC",
  :votes_per_timeslot => "1",
  :votes_per_person => "1",
  :status => "Finished",
  :deadline => "2021-10-30",
  :admin_id => 1
}
Poll.create!(poll3)

# TA Office Hours - Week 14 ----------------------------------------------------

poll4 = {
  :poll_name => "TA Office Hours - Week 14",
  :time_zone => 'CST',
  # :poll_identifier => "1",
  :poll_description => "Reservations for TA office hours",
  :meeting_location => "1212 SC",
  :votes_per_timeslot => "1",
  :votes_per_person => "1",
  :status => "Active",
  :deadline => "-",
  :admin_id => 1
}
Poll.create!(poll4)

# TA Office Hours - Week 15 ----------------------------------------------------

poll5 = {
  :poll_name => "TA Office Hours - Week 15",
  :time_zone => 'CST',
  # :poll_identifier => "1",
  :poll_description => "Reservations for TA office hours",
  :meeting_location => "1212 SC",
  :votes_per_timeslot => "1",
  :votes_per_person => "1",
  :status => "Not Started",
  :deadline => "-",
  :admin_id => 1
}
Poll.create!(poll5)

# TA Office Hours - Week 14 ----------------------------------------------------

poll6 = {
  :poll_name => "TA Office Hours - Week 16",
  :time_zone => 'CST',
  # :poll_identifier => "1",
  :poll_description => "Reservations for TA office hours",
  :meeting_location => "1212 SC",
  :votes_per_timeslot => "1",
  :votes_per_person => "1",
  :status => "Not Started",
  :deadline => "-",
  :admin_id => 1
}
Poll.create!(poll6)