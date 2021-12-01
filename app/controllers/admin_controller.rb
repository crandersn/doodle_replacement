class AdminController < ApplicationController

  def homepage
    # @test = 'this is a drill'
    @polls = Poll.find_each
  end

end