class Timeslot < ActiveRecord::Base
  belongs_to :poll
  has_many :reservers
end
