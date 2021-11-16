class Poll < ActiveRecord::Base
  has_many :timeslots
  belongs_to :admin
end
