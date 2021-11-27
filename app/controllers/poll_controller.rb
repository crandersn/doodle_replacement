class PollController < ApplicationController

  def new

  end

  def choose_time_slots

    # get input params and make them available for the create method
    flash[:title] = params[:title]
    flash[:location] = params[:location]
    flash[:votes_per_timeslot] = params[:votes_per_timeslot]
    flash[:votes_per_person] = params[:votes_per_person]
    flash[:notes] = params[:notes]

  end

  def create

    # check to see if params made it to the create method
    puts flash[:title]
    puts flash[:notes]

    num_appointments =  params["num_appointments"].to_i
    i = 0

    while (i < num_appointments )
      startTime = params["#{i}"]["start_time"]
      endTime = params["#{i}"]["end_time"]
      subject = params["#{i}"]["subject"]

      # instantiate new

      i = i + 1
    end




  end

end
