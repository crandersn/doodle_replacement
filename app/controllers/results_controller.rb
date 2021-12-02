
class ResultsController < ApplicationController
  def get_results

    @poll = Poll.find(params[:poll_id])
    @timeslots = Timeslot.where("poll_id = '#{@poll.id}'")
    @title = @poll.poll_name
    #@reservers = Reserver.where("timeslot_id = '#{@poll.id}'")

    puts ('hi bob')
    puts(@title)
    puts (@timeslots)

    @hash_arr = []
    @timeslots.each do |timeslot|
      puts timeslot
      @reservers = Reserver.where("timeslot_id = '#{timeslot.id}'")
      reserverHash = {timeslot.id => []}
      reserver_arr = []
      @reservers.each do |reserver|
        reserver_arr.push(reserver.name)
      end
      reserverHash[timeslot.id] = reserver_arr
      @hash_arr.push(reserverHash)
    end

    puts(@hash_arr)

  end
end