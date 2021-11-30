class ReactController < ApplicationController
  def index
  end

  def error500
    render action: :index, status: :internal_server_error
  end

  def test500
    raise StandardError
  end
end
