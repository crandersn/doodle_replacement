
class ResultsController < ApplicationController
  def get_results
    flash[:poll_id] = params[:poll_id]
  end
end