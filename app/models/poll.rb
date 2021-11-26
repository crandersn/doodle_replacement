class Poll < ActiveRecord::Base
  belongs_to :admin
  has_many :timeslots
end
