class WebticketController < ApiController
	def index
		@wtk = Webticket.all
		render json: {webticket: @wtk}
	end
end
