class PollController < ApplicationController

  def new

  end

  def choose_time_slots


    # get input params and make them available for the create method
    flash[:title] = params[:title]
    flash[:location] = params[:location]
    flash[:deadline] = params[:expiration_date]
    flash[:votes_per_timeslot] = params[:votes_per_timeslot]
    flash[:votes_per_person] = params[:votes_per_person]
    flash[:notes] = params[:notes]
    flash[:time_zone] = params[:time_zone]

    @title = params[:title]
    @time_zone = params[:time_zone]

  end

  def create

    # check to see if params made it to the create method
    poll = Poll.create!(poll_name: flash[:title], time_zone: flash[:time_zone], poll_description: flash[:notes],
                        meeting_location: flash[:location], votes_per_timeslot: flash[:votes_per_timeslot], votes_per_person: flash[:votes_per_person],
                        deadline: flash[:deadline], status: "inactive", admin_id: current_admin.id)

    num_appointments =  params["num_appointments"].to_i
    i = 0

    while (i < num_appointments )

      startTime = params["#{i}"]["start_time"]
      endTime = params["#{i}"]["end_time"]
      appointment_notes = params["#{i}"]["subject"]

      # instantiate new timeslot for this poll
      Timeslot.create!(available: true, start_time: startTime, end_time: endTime, num_votes: 0, notes: appointment_notes, poll_id: poll.id)

      i = i + 1
    end

    flash[:alert] = "poll successfully created..."

    redirect_to admin_root_path

  end

  def vote

    poll_identifier = params[:poll_identifier]

    @poll = Poll.find(poll_identifier)
    @timeslots = Timeslot.where("poll_id = '#{@poll.id}'")
    @title = @poll.poll_name

  end

  def cast_vote

    username = params[:person]
    timeslot_ids = params[:votes]
    votes_per_timeslot = params[:votes_per_timeslot]

    timeslots = Timeslot.find(timeslot_ids)

    timeslots.each do |timeslot|

      if (timeslot.num_votes + 1) >= votes_per_timeslot.to_i
        timeslot.update(num_votes: timeslot.num_votes + 1, available: false)
      else
        timeslot.update(num_votes: timeslot.num_votes + 1)
      end

      Reserver.create!(name: username, timeslot_id: timeslot.id)

    end

    # TODO: User SHOULD NOT be redirected here in final product
    redirect_to admin_root_path

  end

  def edit

    @poll = Poll.find(params[:id])
    puts(@poll.time_zone)
    flash[:id] = params[:id]

  end

  def edit_time_slots

    # get input params and make them available for the create method
    flash[:title] = params[:title]
    flash[:location] = params[:location]
    flash[:deadline] = params[:expiration_date]
    flash[:votes_per_timeslot] = params[:votes_per_timeslot]
    flash[:votes_per_person] = params[:votes_per_person]
    flash[:notes] = params[:notes]
    flash[:time_zone] = params[:time_zone]
    flash[:id] = flash[:id]

    @title = params[:title]
    @time_zone = params[:time_zone]
    @timeslots = Timeslot.where("poll_id = '#{flash[:id]}'")

  end

  def update

    poll = Poll.find(flash[:id])
    poll.update(poll_name: flash[:title], time_zone: flash[:time_zone], poll_description: flash[:notes],
                        meeting_location: flash[:location], votes_per_timeslot: flash[:votes_per_timeslot], votes_per_person: flash[:votes_per_person],
                        deadline: flash[:deadline], status: "inactive", admin_id: current_admin.id)

    # delete all timeslots associated with this poll
    Timeslot.where("poll_id = '#{poll.id}'").destroy_all

    # create new timeslots associated with this poll
    num_appointments =  params["num_appointments"].to_i
    i = 0

    while (i < num_appointments )

      startTime = params["#{i}"]["start_time"]
      endTime = params["#{i}"]["end_time"]
      appointment_notes = params["#{i}"]["subject"]

      # instantiate new timeslot for this poll
      Timeslot.create!(available: true, start_time: startTime, end_time: endTime, num_votes: 0, notes: appointment_notes, poll_id: poll.id)

      i = i + 1
    end

    flash[:alert] = "poll successfully created..."

    redirect_to admin_root_path

  end

end
