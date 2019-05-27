class Api::MessagesController < ApplicationController
  before_action :set_info
  
  def index
    respond_to do |format| 
      format.html 
      format.json { @new_messages = @group.messages.where("id > ?", params[:id]) }
    end
  end

  private
  
  def set_info
    @messages = Message.all
    @group = Group.find(params[:group_id])
  end

end
