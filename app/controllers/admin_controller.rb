class AdminController < ApplicationController

  def homepage
    # @test = 'this is a drill'
    @not_started_polls = Poll.where("status = 'Not Started'")
    @active_polls = Poll.where("status = 'Active'")
    @finished_polls = Poll.where("status = 'Finished'")
  end

end