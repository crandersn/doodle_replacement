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

    poll_ended = Poll.find(id)
    poll_ended.status = 'Finished'
    poll_ended.save!

    redirect_to admin_root_path

  end

  def delete

    id = params["delete_poll"]

    poll_deleted = Poll.find(id)
    poll_deleted.destroy

    redirect_to admin_root_path

  end

  def new

    redirect_to poll_new_url

  end

end