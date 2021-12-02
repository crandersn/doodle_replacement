class AdminController < ApplicationController

  def homepage
    @test = params[:test]
    @not_started_polls = Poll.where("status = 'Not Started'")
    @active_polls = Poll.where("status = 'Active'")
    @finished_polls = Poll.where("status = 'Finished'")
  end

  def start

    id = params["start_poll"]

    poll_started = Poll.find(id)
    poll_started.status = 'Active'
    poll_started.save!

    redirect_to admin_root_path

  end

  def end

    id = params["end_poll"]

    poll_started = Poll.find(id)
    poll_started.status = 'Finished'
    poll_started.save!

    redirect_to admin_root_path

  end

end