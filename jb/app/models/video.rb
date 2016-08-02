class Video < ActiveRecord::Base
	mount_uploader :video_url
	belongs_to :album, VideoUploader
end
