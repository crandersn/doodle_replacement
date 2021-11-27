class Poll < ActiveRecord::Base
  belongs_to :admin
  has_many :timeslots
  has_many :invitees
end
