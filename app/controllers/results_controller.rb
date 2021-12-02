
class ResultsController < ApplicationController
  def get_results
    flash[:poll_id] = params[:poll_id]

    poll_identifier = params[:poll_identifier]

    @poll = Poll.where("poll_identifier = '#{flash[:poll_id]}'").first
    @timeslots = Timeslot.where("poll_id = '#{@poll.id}'")
    @title = @poll.poll_name
    @reservers = Reserver.where("poll_id = '#{@poll.id}'")

  end
end