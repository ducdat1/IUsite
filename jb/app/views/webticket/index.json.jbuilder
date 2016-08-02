json.array!(@webticket) do |ticket|
  json.extract! ticket, :id, :title, :date
  json.url ticket_url(ticket, format: :json)
end
