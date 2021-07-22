from typing import List
from flask import Flask
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.mutable import MutableList
from sqlalchemy import PickleType

app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

class FlowModel(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	flow = db.Column(MutableList.as_mutable(PickleType), default=[], nullable=False)

	def __repr__(self):
		return f"Flow(ID = {id})"

flow_put_args = reqparse.RequestParser()
flow_put_args.add_argument("flow", type=list, help="Flow is required", required=True)

flow_update_args = reqparse.RequestParser()
flow_update_args.add_argument("flow", type=list, help="Flow is required", required = True)

resource_fields = {
	'id': fields.Integer,
	'flow': fields.List,
}

class Flowdata(Resource):
	@marshal_with(resource_fields)
	def get(self, flow_id):
		result = FlowModel.query.filter_by(id=flow_id).first()
		if not result:
			abort(404, message="Could not find your flow.")
		return result

	@marshal_with(resource_fields)
	def put(self, flow_id):
		args = flow_put_args.parse_args()
		result = FlowModel.query.filter_by(id=flow_id).first()
		if result:
			abort(409, message="Flow already stored.")

		flow = FlowModel(id=flow_id, flow = args['flow'])
		db.session.add(flow)
		db.session.commit()
		return flow, 201

	@marshal_with(resource_fields)
	def patch(self, flow_id):
		args = flow_update_args.parse_args()
		result = FlowModel.query.filter_by(id=flow_id).first()
		if not result:
			abort(404, message="Flow doesn't exist, cannot update.")

		if args['flow']:
			result.flow = args['flow']

		db.session.commit()

		return result


api.add_resource(Flowdata, "/flow/<int:user_id>")

if __name__ == "__main__":
	app.run(debug=True)
