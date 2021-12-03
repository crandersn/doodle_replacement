class ResultsController < ApplicationController
  def get_results

    @poll = Poll.find(params[:poll_id])
    @timeslots = Timeslot.where("poll_id = '#{@poll.id}'")
    @title = @poll.poll_name

    puts ('hi bob')
    puts(@title)
    puts (@timeslots)

    @hash_arr = []
    @timeslots.each do |timeslot|
      puts timeslot

      @reservers = Reserver.where("timeslot_id = '#{timeslot.id}'")

      slot = {}

      raw_datetime_start = timeslot.start_time.delete(",").split(" ")
      
      year_start = raw_datetime_start[3].to_i
      month_start = raw_datetime_start[2].downcase
      day_month_start = raw_datetime_start[1].to_i

      atomic_start = raw_datetime_start[4].split(":")
      hours_start = atomic_start[0].to_i
      minutes_start = atomic_start[1].to_i
      seconds_start = 0

      t_start = Time.utc(year_start,month_start,day_month_start,hours_start,minutes_start,seconds_start)
      slot[:start] = t_start.localtime.strftime("%Y-%m-%d %l:%M:%S %p")

      raw_datetime_end = timeslot.end_time.delete(",").split(" ")

      year_end = raw_datetime_end[3].to_i
      month_end = raw_datetime_end[2].downcase
      day_month_end = raw_datetime_end[1].to_i

      atomic_end = raw_datetime_end[4].split(":")
      hours_end = atomic_end[0].to_i
      minutes_end = atomic_end[1].to_i
      seconds_end = 0
      t_end = Time.utc(year_end,month_end,day_month_end,hours_end,minutes_end,seconds_end)
      slot[:end] = t_end.localtime.strftime("%Y-%m-%d %l:%M:%S %p")

      slot[:available] = timeslot.available
      slot[:num_votes] = timeslot.num_votes

      reserverHash = {timeslot.id => []}
      reserver_string = ""
      @reservers.each do |reserver|
        reserver_string += reserver.name + ", "
      end
      reserver_string = reserver_string[0...-2]
      if reserver_string == ""
        reserver_string = "No Reservers"
      end
      slot[:reservers] = reserver_string
      @hash_arr.push(slot)
    end

    puts(@hash_arr)

  end
end
