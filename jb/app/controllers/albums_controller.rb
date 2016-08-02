class AlbumsController < InheritedResources::Base

  private

    def album_params
      params.require(:album).permit(:name)
    end
end

