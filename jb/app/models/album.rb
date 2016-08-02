class Album < ActiveRecord::Base
	has_many :video
end
