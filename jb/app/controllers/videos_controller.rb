class VideosController < InheritedResources::Base

  private

    def video_params
      params.require(:video).permit(:name, :video_url)
    end
end

